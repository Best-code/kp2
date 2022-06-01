import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, Button, CardActionArea, CardActions, FormControlLabel } from '@mui/material';
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, Checkbox, DialogActions } from '@mui/material'
import { serverRoute } from '../../config';


interface ClassInt {
  name: string
  def: string
  entryId: string
  key: number
  isAdmin: boolean
}

import * as contentful from "contentful"

var client = contentful.createClient({
    space: String(process.env.SPACE) as string,
    accessToken: String(process.env.CONTENTFUL_ACCESS_TOKEN) as string
});


export const ClassCard = (props: ClassInt) => {

  const [json, setJson] = useState();
  const [entry, setEntry] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${serverRoute}/api/classes/class/?name=${props.name}`)
      const json = await res.json();

      const entry = await client.getEntry(json.image)
      console.log(entry)
    }

    fetchData().catch(console.error)

});

  const [check, setCheck] = useState(false)
  const [error, setError] = useState(false)


  const router = useRouter();
  const HandleDelete = () => {
    if (check) {
      fetch(`/api/delete/class`, {
        body: JSON.stringify({
          name: props.name,
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      router.reload()
    } else {
      setError(true)
    }
  }

  const DeleteError = () => {
    return (
      <Alert severity="warning">You must check the box.</Alert>
    )
  }

  const [dialog, setDialog] = useState(false)
  const DialogComponent = () => {
    return (
      <div>
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Delete {props.name}</DialogTitle>
          <DialogContent>
            {error && <DeleteError />}
            <DialogContentText>
              Are you sure you would like to continue, this will permanently delete this class and it can not be undone.
            </DialogContentText>
            <FormControlLabel
              label={`I want to delete the class ${props.name}`}
              control={<Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />
              } />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setDialog(false)
              setError(false)
              setCheck(false)
            }
            }>Cancel</Button>
            <Button onClick={HandleDelete}>Proceed</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }


  const DeleteClass = () => {
    return <div className="flex justify-end items-end w-full">
      <button onClick={() => setDialog(true)}>
        <FontAwesomeIcon className="w-8 h-8 hover:cursor-pointer hover:w-16 hover:h-16" icon={faTrashCan} />
      </button>
    </div>
  }

  return (
    <div key={props.key} className="mx-auto px-2 pb-4 md:pb-12">
      <Card className="max-w-[30rem]">
        <Link href={`/class/${props.name}`}>
          <CardActionArea>
            <CardMedia className="h-48"
              component="img"
              height="140"
              src={`https://ysbyzygo.sirv.com/kp2/` + props.entryId}
              alt={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
              <p className="text-sm text-gray-500 h-20 overflow-scroll">
                {props.def}
              </p>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions className="flex">
          <Button size="small" color="primary">
            <a href={`mailto:test@example.com?subject=Check out Mrs.Kilpatrick's ${props.name} class!&body=Here is the link!%0ahttps://kilpatty.vercel.app${router.pathname}/${props.name}`}>
              Share
            </a>
          </Button>
          {props.isAdmin && DeleteClass()}
          <DialogComponent />
        </CardActions>
      </Card>
    </div>
  );
}

export default ClassCard;