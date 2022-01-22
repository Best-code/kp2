import { useEffect, useState } from "react";
import { getSession } from "next-auth/react"
import { useRouter } from "next/router";

const CreateHandoutForm = ({ session }: any) => {
    const [name, setName] = useState("")
    const [unitId, setUnitId] = useState("")

    const router = useRouter();
    const { className, unitName } = router.query;
    useEffect(() => {
        if (unitName) {
            fetch(`/api/units/name?name=${unitName}`)
                .then((res) => res.json())
                .then((resData) => {
                    setUnitId(resData)
                })
        }
    })

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`/api/create/handout`, {
            body: JSON.stringify({
                name: name,
                unitId: unitId,
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })

        router.push(`/class/${className}/${unitName}`)
    }

    return (
        <>
            {session && (
                <div>
                    <div className="md:grid md:grid-cols-1 md:gap-6">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
                                                    Handout Name
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={e => setName(e.target.value)}
                                                        type="text"
                                                        name="unit-name"
                                                        id="name"
                                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                                        placeholder="Worksheet One"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                onClick={HandleSubmit}
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateHandoutForm;

export async function getServerSideProps({ req }: any) {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            }
        }
    }

    return {
        props: {
            session,
        }
    }

}