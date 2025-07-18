package types

func NewMsgMintToken(owner string, denom string, amount int64, to string) *MsgMintToken {
	return &MsgMintToken{
		Owner:  owner,
		Denom:  denom,
		Amount: amount,
		To:     to,
	}
}
