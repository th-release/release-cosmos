package keeper_test

import (
	"context"
	"strconv"
	"testing"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"release/x/storage/keeper"
	"release/x/storage/types"
)

func createNStorage(keeper keeper.Keeper, ctx context.Context, n int) []types.Storage {
	items := make([]types.Storage, n)
	for i := range items {
		items[i].Denom = strconv.Itoa(i)
		items[i].Data = strconv.Itoa(i)
		_ = keeper.Storage.Set(ctx, items[i].Denom, items[i])
	}
	return items
}

func TestStorageQuerySingle(t *testing.T) {
	f := initFixture(t)
	qs := keeper.NewQueryServerImpl(f.keeper)
	msgs := createNStorage(f.keeper, f.ctx, 2)
	tests := []struct {
		desc     string
		request  *types.QueryGetStorageRequest
		response *types.QueryGetStorageResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetStorageRequest{
				Denom: msgs[0].Denom,
			},
			response: &types.QueryGetStorageResponse{Storage: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetStorageRequest{
				Denom: msgs[1].Denom,
			},
			response: &types.QueryGetStorageResponse{Storage: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetStorageRequest{
				Denom: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	}
	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := qs.GetStorage(f.ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.EqualExportedValues(t, tc.response, response)
			}
		})
	}
}

func TestStorageQueryPaginated(t *testing.T) {
	f := initFixture(t)
	qs := keeper.NewQueryServerImpl(f.keeper)
	msgs := createNStorage(f.keeper, f.ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllStorageRequest {
		return &types.QueryAllStorageRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := qs.ListStorage(f.ctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Storage), step)
			require.Subset(t, msgs, resp.Storage)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := qs.ListStorage(f.ctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.Storage), step)
			require.Subset(t, msgs, resp.Storage)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := qs.ListStorage(f.ctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.EqualExportedValues(t, msgs, resp.Storage)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := qs.ListStorage(f.ctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
