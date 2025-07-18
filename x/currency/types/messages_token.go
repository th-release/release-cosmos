package types

func NewMsgCreateToken(
	owner string,
	denom string,
	name string,
	symbol string,
	metadataUrl string,
	totalSupply int64,
	supply int64,
	decimals int64,
	initialPrice int64,

) *MsgCreateToken {
	return &MsgCreateToken{
		Owner:        owner,
		Denom:        denom,
		Name:         name,
		Symbol:       symbol,
		MetadataUrl:  metadataUrl,
		TotalSupply:  totalSupply,
		Supply:       supply,
		Decimals:     decimals,
		InitialPrice: initialPrice,
	}
}

func NewMsgUpdateToken(
	owner string,
	denom string,
	name string,
	symbol string,
	metadataUrl string,
	totalSupply int64,
	supply int64,
	decimals int64,
	initialPrice int64,

) *MsgUpdateToken {
	return &MsgUpdateToken{
		Owner:        owner,
		Denom:        denom,
		Name:         name,
		Symbol:       symbol,
		MetadataUrl:  metadataUrl,
		TotalSupply:  totalSupply,
		Supply:       supply,
		Decimals:     decimals,
		InitialPrice: initialPrice,
	}
}
