import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/router';

interface ClassInt {
  name: string
  def: string
  image: string
  key: number
}


export const ClassCard = (props: ClassInt) => {
  const { data: session } = useSession()
  const router = useRouter();
  const HandleDelete = () => {
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
  }

  const DeleteClass = () => {
    if (session) {
      return <div className="flex justify-end items-end w-full">
        <FontAwesomeIcon className="w-8 h-8 hover:cursor-pointer hover:w-16 hover:h-16" onClick={HandleDelete} icon={faTrashCan} />
      </div>
    } return <></>
  }

  return (
    <div key={props.key} className="mx-auto px-2 pb-4 md:pb-12">
      <Card sx={{ maxWidth: 345 }} className="md:w-96">
        <Link href={`/class/${props.name}`}>
          <CardActionArea>
            <CardMedia className="h-48"
              component="img"
              height="140"
              src={`https://ysbyzygo.sirv.com/kp2/` + props.image}
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
            Share
          </Button>
          {DeleteClass()}
        </CardActions>
      </Card>
    </div>
  );
}

export default ClassCard;