package keeper

import (
	"context"

	"release/x/storage/types"

	errorsmod "cosmossdk.io/errors"
)

func (k msgServer) UpdateData(ctx context.Context, msg *types.MsgUpdateData) (*types.MsgUpdateDataResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	// TODO: Handle the message

	return &types.MsgUpdateDataResponse{}, nil
}
