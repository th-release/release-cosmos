package keeper

import (
	"context"

	"release/x/currency/types"

	errorsmod "cosmossdk.io/errors"
)

func (k msgServer) MintToken(ctx context.Context, msg *types.MsgMintToken) (*types.MsgMintTokenResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	// TODO: Handle the message

	return &types.MsgMintTokenResponse{}, nil
}
