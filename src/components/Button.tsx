export default function Button({width, bgColor, textColor, value, onClick}: {width: string, bgColor: string, textColor: string, value: string, onClick: any}) {

    const className = `${bgColor} ${textColor} text-sm p-2 ${width} rounded-md`;

    return (

        <>
        <button className= {className} onClick={onClick}>{value}</button>
        </>
    )
}