package keeper

import (
	"context"
	"errors"

	"release/x/storage/types"

	"cosmossdk.io/collections"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) ListStorage(ctx context.Context, req *types.QueryAllStorageRequest) (*types.QueryAllStorageResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	storages, pageRes, err := query.CollectionPaginate(
		ctx,
		q.k.Storage,
		req.Pagination,
		func(_ string, value types.Storage) (types.Storage, error) {
			return value, nil
		},
	)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStorageResponse{Storage: storages, Pagination: pageRes}, nil
}

func (q queryServer) GetStorage(ctx context.Context, req *types.QueryGetStorageRequest) (*types.QueryGetStorageResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	val, err := q.k.Storage.Get(ctx, req.Denom)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, status.Error(codes.NotFound, "not found")
		}

		return nil, status.Error(codes.Internal, "internal error")
	}

	return &types.QueryGetStorageResponse{Storage: val}, nil
}
