"use client"
import React, {useRef, useState} from 'react'

import {useForm} from "react-hook-form";
import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Button} from "@mui/material";
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import {bucketName, s3} from "@/AWS";
import {useUser} from "@/app/context/user";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default React.memo(() => {
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();
    const router = useRouter();

    const {user} = useUser();
    const formRef = useRef();
    const onSubmit = async (data) => {
        try {
            if (data.images.length > 0) {
                await uploadFiles(imgs, user);
                const response = await axios.post("/api/products/create", {
                    ...data,
                    url: user?.id + data.images?.[0]?.name
                });
                toast.success(response.data);
                // const files = data?.images;
                // const base64Array = await convertFilesToBase64(files);
                // console.log("base64Array", base64Array);
                return router?.push('/')
            } else {
                toast.warn("Please upload an image!")
            }


        } catch (err) {
            console.log(err)
            toast.error("error");
        }

    }
    const [imgs, setImgs] = useState([]);
    console.log("bucket", bucketName);

    return (<div>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <TextField required id="title" label="Title"
                               sx={{m: 1, width: '100%'}}
                               variant="outlined"  {...register("title")}/>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        maxRows={8}
                        variant="outlined"
                        sx={{m: 1, width: '100%'}}
                        {...register("description")}/>
                    <TextField required id="price" label="Price"
                               type="number"
                               sx={{m: 1, width: '100%'}}
                               variant="outlined"
                               {...register("price")}/>


                </Grid>
                <Grid size={6}>
                    {imgs.length > 0 && <ImageListInput imgs={imgs}/>}

                    <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                        startIcon={<CloudUploadIcon/>}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                setValue("images", event.target.files)
                                setImgs(Array.from(event.target.files));
                            }}
                            multiple
                        />
                    </Button>
                </Grid>
                <Button variant="outlined" type={"submit"}>Create</Button>

            </Grid>

        </form>

    </div>)
})


const ImageListInput = React.memo(({imgs}) => {
    return (
        (<ImageList sx={{width: 500, height: 450}}>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Product Images</ListSubheader>
            </ImageListItem>
            {imgs?.map((item) => {
                const url = URL.createObjectURL(item);
                return (
                    <ImageListItem key={url}>
                        <img
                            srcSet={url}
                            src={url}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            // subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                    aria-label={`info about ${item.name}`}
                                >
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                )
            })}
        </ImageList>)
    )
});

// function convertFilesToBase64(files) {
//     const promises = Array.from(files).map((file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 const base64String = reader.result.split(',')[1];
//                 resolve(base64String);
//             };
//             reader.onerror = (error) => reject(error);
//             reader.readAsDataURL(file);
//         });
//     });
//
//     return Promise.all(promises);
// }

async function uploadFiles(files, user) {

    if (files.length === 0) {
        console.log('No files selected');
        return;
    }

    const uploadPromises = Array.from(files).map(file => {
        const params = {
            Bucket: bucketName,
            Key: user.id + file.name,
            Body: file,
            ContentType: file.type,
        };

        return s3.upload(params).promise();
    });

    const result = await Promise.all(uploadPromises).catch((err) => err);
    console.log('Files uploaded successfully:', result);
    console.error('Error uploading files:', result);
    return result;
}