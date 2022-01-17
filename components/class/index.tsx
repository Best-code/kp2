import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from "next/link"

interface ClassInt {
  name: string
  def: string
  image: string
  key: number
}

export const ClassCard = (props: ClassInt) => {
  return (
    <div key={props.key} className="mx-auto">
      <Card sx={{ maxWidth: 345 }}>
        <Link href={`/class/${props.name}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src={props.image}
              alt={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.def}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ClassCard;