import * as contentful from "contentful"

var client = contentful.createClient({
    space: process.env.SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string
});


export async function getStaticProps() {
    const entry: any = await client.getEntry("7xzds1ypBVCPL1fxZhN6a4")
    // logs the entry metadata
    console.log(entry.sys);

    // logs the field with ID title
    console.log(entry.fields.handoutFile.fields.title);
    console.log(entry.fields.handoutFile.fields.file.url);
    // console.log( JSON.stringify(entry.fields, null, 2));
    const link = await entry.fields.handoutFile.fields.file.url


    return {
        props: { link }, // will be passed to the page component as props
    }
}



const HandoutPage = ({ link }: any) => {
    return (
            <a className="w-screen h-screen bg-red-900" href={`${link}`}>a</a>
    )
}

export async function getStaticPaths() {
    return {
        paths: [

        ],
        fallback: true
    }
}

export default HandoutPage;