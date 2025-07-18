package types

func NewMsgBurnToken(owner string, denom string, amount int64, from string) *MsgBurnToken {
	return &MsgBurnToken{
		Owner:  owner,
		Denom:  denom,
		Amount: amount,
		From:   from,
	}
}
