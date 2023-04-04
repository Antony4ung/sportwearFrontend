import React from 'react'
import {Box,Typography,Button} from "@mui/material"
import Image from 'next/image'
import {useRouter} from 'next/router'

type Props = {
  title:string,
  imageSrc:string,
  h?:string
}

const NoItems = ({title,imageSrc,h}: Props) => {
    const router = useRouter()
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height: h || "92vh",flexDirection:"column"}}>
        <Image src={imageSrc} alt={title} width={150} height={150}/>
        <Typography sx={{mt:5}} variant='body1'>
            {title}
        </Typography>
        <Button onClick={()=>router.push("/")} variant='outlined' sx={{mt:3}} size='small'>
            Explore products
        </Button>
    </Box>
  )
}

export default NoItems