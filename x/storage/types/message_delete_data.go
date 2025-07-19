package types

func NewMsgDeleteData(owner string, denom string, key string) *MsgDeleteData {
	return &MsgDeleteData{
		Owner: owner,
		Denom: denom,
		Key:   key,
	}
}
