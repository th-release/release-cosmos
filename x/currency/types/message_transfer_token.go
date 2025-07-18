package types

func NewMsgTransferToken(owner string, denom string, amount int64, from string, to string) *MsgTransferToken {
	return &MsgTransferToken{
		Owner:  owner,
		Denom:  denom,
		Amount: amount,
		From:   from,
		To:     to,
	}
}
