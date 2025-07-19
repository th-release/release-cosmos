package keeper

import (
	"context"
	"encoding/json"
	"errors"

	"release/x/storage/types"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (q queryServer) Data(ctx context.Context, req *types.QueryDataRequest) (*types.QueryDataResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var jsonData map[string]string

	val, err := q.k.Storage.Get(ctx, req.Denom)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, "Denom not found")
		}

		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	err = json.Unmarshal([]byte(val.Data), &jsonData)
	if err != nil {
		jsonData = make(map[string]string)
	}

	if len(jsonData[req.Key]) == 0 {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "Not found Data")
	}

	return &types.QueryDataResponse{
		Value: jsonData[req.Key],
	}, nil
}
