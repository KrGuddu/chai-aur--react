import React, {useId} from 'react'

function InputBox ({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId

    return(
        <div className=''>
            <div className=''>
                <label htmlFor={amountInputId} className=''>
                    {label}
                </label>

                <input 
                    id= {amountInputId}
                    className=''
                    type="number"
                    placeholder='Amount'
                    disabled = {amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />

            </div>

            <div className=''>
                <p className=''>Currency Type</p>
                <select 
                    className=''
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled = {currencyDisable}
                >
                    {currencyOption.map((Currency) => (
                        <option key={Currency} value={Currency}>
                            {Currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
    
}

export default InputBox;