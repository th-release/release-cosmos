package keeper_test

import (
	"strconv"
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"release/x/storage/keeper"
	"release/x/storage/types"
)

func TestStorageMsgServerCreate(t *testing.T) {
	f := initFixture(t)
	srv := keeper.NewMsgServerImpl(f.keeper)
	owner, err := f.addressCodec.BytesToString([]byte("signerAddr__________________"))
	require.NoError(t, err)

	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateStorage{Owner: owner,
			Denom: strconv.Itoa(i),
		}
		_, err := srv.CreateStorage(f.ctx, expected)
		require.NoError(t, err)
		rst, err := f.keeper.Storage.Get(f.ctx, expected.Denom)
		require.NoError(t, err)
		require.Equal(t, expected.Owner, rst.Owner)
	}
}

func TestStorageMsgServerUpdate(t *testing.T) {
	f := initFixture(t)
	srv := keeper.NewMsgServerImpl(f.keeper)

	owner, err := f.addressCodec.BytesToString([]byte("signerAddr__________________"))
	require.NoError(t, err)

	unauthorizedAddr, err := f.addressCodec.BytesToString([]byte("unauthorizedAddr___________"))
	require.NoError(t, err)

	expected := &types.MsgCreateStorage{Owner: owner,
		Denom: strconv.Itoa(0),
	}
	_, err = srv.CreateStorage(f.ctx, expected)
	require.NoError(t, err)

	tests := []struct {
		desc    string
		request *types.MsgUpdateStorage
		err     error
	}{
		{
			desc: "invalid address",
			request: &types.MsgUpdateStorage{Owner: "invalid",
				Denom: strconv.Itoa(0),
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			desc: "unauthorized",
			request: &types.MsgUpdateStorage{Owner: unauthorizedAddr,
				Denom: strconv.Itoa(0),
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "key not found",
			request: &types.MsgUpdateStorage{Owner: owner,
				Denom: strconv.Itoa(100000),
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "completed",
			request: &types.MsgUpdateStorage{Owner: owner,
				Denom: strconv.Itoa(0),
			},
		},
	}
	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.UpdateStorage(f.ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				rst, err := f.keeper.Storage.Get(f.ctx, expected.Denom)
				require.NoError(t, err)
				require.Equal(t, expected.Owner, rst.Owner)
			}
		})
	}
}

func TestStorageMsgServerDelete(t *testing.T) {
	f := initFixture(t)
	srv := keeper.NewMsgServerImpl(f.keeper)

	owner, err := f.addressCodec.BytesToString([]byte("signerAddr__________________"))
	require.NoError(t, err)

	unauthorizedAddr, err := f.addressCodec.BytesToString([]byte("unauthorizedAddr___________"))
	require.NoError(t, err)

	_, err = srv.CreateStorage(f.ctx, &types.MsgCreateStorage{Owner: owner,
		Denom: strconv.Itoa(0),
	})
	require.NoError(t, err)

	tests := []struct {
		desc    string
		request *types.MsgDeleteStorage
		err     error
	}{
		{
			desc: "invalid address",
			request: &types.MsgDeleteStorage{Owner: "invalid",
				Denom: strconv.Itoa(0),
			},
			err: sdkerrors.ErrInvalidAddress,
		},
		{
			desc: "unauthorized",
			request: &types.MsgDeleteStorage{Owner: unauthorizedAddr,
				Denom: strconv.Itoa(0),
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "key not found",
			request: &types.MsgDeleteStorage{Owner: owner,
				Denom: strconv.Itoa(100000),
			},
			err: sdkerrors.ErrKeyNotFound,
		},
		{
			desc: "completed",
			request: &types.MsgDeleteStorage{Owner: owner,
				Denom: strconv.Itoa(0),
			},
		},
	}
	for _, tc := range tests {
		t.Run(tc.desc, func(t *testing.T) {
			_, err = srv.DeleteStorage(f.ctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				found, err := f.keeper.Storage.Has(f.ctx, tc.request.Denom)
				require.NoError(t, err)
				require.False(t, found)
			}
		})
	}
}
