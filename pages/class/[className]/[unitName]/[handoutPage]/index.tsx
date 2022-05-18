import * as contentful from "contentful"
import { GetServerSideProps } from "next";
import { serverRoute } from "../../../../../config";

var client = contentful.createClient({
    space: process.env.SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string
});


// export async function getStaticProps(context : any) {
//     const {unitName} = context.query;
//     const content = await fetch(`${serverRoute}/api/units/name?name=${unitName}`)
//     const entry: any = await client.getEntry(content.contentId)
//     // logs the entry metadata
//     console.log(entry.sys);

//     // logs the field with ID title
//     console.log(entry.fields.handoutFile.fields.title);
//     console.log(entry.fields.handoutFile.fields.file.url);
//     // console.log( JSON.stringify(entry.fields, null, 2));
//     const link = await entry.fields.handoutFile.fields.file.url


//     return {
//         props: { link }, // will be passed to the page component as props
//     }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { unitName, handoutPage } = context.query;
    const unitIdRes = await fetch(`${serverRoute}/api/units/name?name=${unitName}`)
    const unitId = await unitIdRes.json()
    const handoutRes = await fetch(`${serverRoute}/api/classes/handout/?unitId=${unitId}&handoutName=${handoutPage}`)
    const handout = await handoutRes.json()
    console.log(handout, "as")
    var link = null
    if (handout.contentId) {
        const entry: any = await client.getEntry(handout.contentId)
        link = await entry.fields.handoutFile.fields.file.url
    }

    return {
        props:
            { unitName, link, handoutPage }
    }
}


const HandoutPage = ({ link , handoutPage}: any) => {

    if (link != null) {
        return (
            <div className="flex items-center justify-center w-screen h-screen text-3xl font-bold shadow">
                <a className="flex items-center justify-center absolute top-0 w-screen h-screen bg-indigo-700" href={`${link}`}>{`Click To Download ${handoutPage}`}</a>
            </div>
        )
    } else {
        return (<div>Nothing to see here</div>)
    }

}

// export async function getStaticPaths() {
//     return {
//         paths: [

//         ],
//         fallback: true
//     }
// }

export default HandoutPage;