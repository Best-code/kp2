import * as contentful from "contentful"
var client = contentful.createClient({
    space: process.env.SPACE as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string
});

export function getStaticProps() {
    client.getEntry("7xzds1ypBVCPL1fxZhN6a4").then(function (entry: any) {
        // logs the entry metadata
        console.log(entry.sys);

        // logs the field with ID title
        console.log(entry.fields.productName);
    });

    return {
        props: {}, // will be passed to the page component as props
    }
}


const HandoutPage = () => {
    return (<div>

    </div>)
}

export async function getStaticPaths() {
    return {
        paths: [
            
        ],
        fallback: true
    }
}

export default HandoutPage;