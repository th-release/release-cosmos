package keeper

import (
	"context"
	"encoding/json"
	"errors"

	"release/x/storage/types"

	"cosmossdk.io/collections"
	errorsmod "cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) DeleteData(ctx context.Context, msg *types.MsgDeleteData) (*types.MsgDeleteDataResponse, error) {
	if _, err := k.addressCodec.StringToBytes(msg.Owner); err != nil {
		return nil, errorsmod.Wrap(err, "invalid authority address")
	}

	var jsonData map[string]string

	val, err := k.Storage.Get(ctx, msg.Denom)
	if err != nil {
		if errors.Is(err, collections.ErrNotFound) {
			return nil, errorsmod.Wrap(sdkerrors.ErrKeyNotFound, "Denom not found")
		}

		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, err.Error())
	}

	if msg.Owner != val.Owner {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	err = json.Unmarshal([]byte(val.Data), &jsonData)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "Json conversion failed")
	}

	if len(jsonData[msg.Key]) == 0 {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "Not found Data")
	}

	delete(jsonData, msg.Key)

	result, err := json.Marshal(jsonData)
	if err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrUnauthorized, "Json conversion failed")
	}

	var storage = types.Storage{
		Owner: msg.Owner,
		Denom: msg.Denom,
		Data:  string(result),
	}

	if err := k.Storage.Set(ctx, storage.Denom, storage); err != nil {
		return nil, errorsmod.Wrap(sdkerrors.ErrLogic, "failed to update storage")
	}

	return &types.MsgDeleteDataResponse{}, nil
}
