package types

import (
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterInterfaces(registrar codectypes.InterfaceRegistry) {
	registrar.RegisterImplementations((*sdk.Msg)(nil),
		&MsgTransferToken{},
	)

	registrar.RegisterImplementations((*sdk.Msg)(nil),
		&MsgBurnToken{},
	)

	registrar.RegisterImplementations((*sdk.Msg)(nil),
		&MsgMintToken{},
	)

	registrar.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateToken{},
		&MsgUpdateToken{},
	)

	registrar.RegisterImplementations((*sdk.Msg)(nil),
		&MsgUpdateParams{},
	)
	msgservice.RegisterMsgServiceDesc(registrar, &_Msg_serviceDesc)
}
