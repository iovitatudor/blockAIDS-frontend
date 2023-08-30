import React, {useState, useRef} from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import {canvasPreview} from '../helpers/canvasPreview'
import {useDebounceEffect} from '../hooks/useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import {Button, Grid, Stack} from "@mui/material";
import MyButton from "../../../ui/MyButton";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function App() {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      // console.log(blobUrlRef.current, URL.revokeObjectURL(blobUrlRef.current));

      const blob1 = new Blob([blobUrlRef.current], {type: "image/png"});
      const url = URL.createObjectURL(blob1);
      const img = new Image();
      img.src = url;
      console.log(blob1, img)

      // hiddenAnchorRef.current!.href = blobUrlRef.current
      // hiddenAnchorRef.current!.click()
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      console.log('here')
      const {width, height} = imgRef.current
      setAspect(16 / 9)
      const newCrop = centerAspectCrop(width, height, 16 / 9)
      setCrop(newCrop)
      // Updates the preview
      setCompletedCrop(convertToPixelCrop(newCrop, width, height))
    }
  }

  return (
    <div className="crop-app">
      <div className="Crop-Controls">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained" component="label">
            Upload image
            <input hidden accept="image/*" type="file" onChange={onSelectFile}/>
          </Button>
        </Stack>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              circularCrop={true}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{transform: `scale(${scale}) rotate(${rotate}deg)`}}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </Grid>
        <Grid item xs={6}>
          {!!completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: '1px solid #13C2BD',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                    borderRadius: '50%'
                  }}
                />
                <MyButton onClick={onDownloadCropClick}>Download Avatar</MyButton>
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
