package keeper

import (
	"context"

	"release/x/storage/types"

	errorsmod "cosmossdk.io/errors"
)

func (k msgServer) CreateData(ctx context.Context, msg *types.MsgCreateData) (*types.MsgCreateDataResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	// TODO: Handle the message

	return &types.MsgCreateDataResponse{}, nil
}
