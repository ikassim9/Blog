export default function Button({width, bgColor, textColor, value}: {width: string, bgColor: string, textColor: string, value: string}) {

    const className = `${bgColor} ${textColor} text-sm p-2 ${width} rounded-md`;

    return (

        <>
        <button className= {className}>{value}</button>
        </>
    )
}