import { ReactNode } from 'react'
import { Card,  CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

type Props = {
    title:string;
    description:string;
    content:ReactNode;
    footer:ReactNode;
}

const CardTag = ({title,description,content,footer}:Props) => {
  return (
    <Card className="card-tag bg-white dark:bg-slate-800/50 ">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {content}
        </CardContent>
        <CardFooter>
            {footer}
        </CardFooter>
    </Card>
  )
}

export default CardTag