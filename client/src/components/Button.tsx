export default function Button({value}: {value: string}) {

    return (

        <>
        <button className="bg-primary text-white p-2 w-28 rounded-md" >{value}</button>
        </>
    )
}