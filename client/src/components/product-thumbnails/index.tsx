import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { cn } from '@/lib/utils'
import MaskShadow from '@/components/mask-shadow'
import { useLocation } from 'react-router-dom'
import './index.scss'

export interface ProductThumbnailsProps {
  images: string[] | undefined
  options?: EmblaOptionsType
}

export default function ProductThumbnails(props: ProductThumbnailsProps) {
  const { images, options } = props
  const location = useLocation()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'trimSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  useEffect(() => {
    setSelectedIndex(0)
    emblaMainApi?.scrollTo(0, true)
  }, [location, emblaMainApi])

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
    return () => {
      emblaMainApi.off('select', onSelect)
      emblaMainApi.off('reInit', onSelect)
      emblaMainApi.destroy()
      emblaThumbsApi?.destroy()
    }
  }, [emblaMainApi, emblaThumbsApi, onSelect])

  if (!images) return null

  // prettier-ignore
  const placementShadow =
    emblaThumbsApi?.canScrollNext() && emblaThumbsApi?.canScrollPrev()
      ? 'left-right'
      : emblaThumbsApi?.canScrollNext()
        ? 'right'
        : emblaThumbsApi?.canScrollPrev()
          ? 'left'
          : null

  return (
    <div className='flex flex-col gap-3 md:gap-4 '>
      <div className='product-thumbnails -mx-[4%] xs:mx-0'>
        <div className='bg-content1 rounded-none xs:rounded-xl md:rounded-3xl overflow-hidden relative aspect-video h-full w-full flex justify-center'>
          <div
            className='product-thumbnails__viewport aspect-video cursor-grab'
            ref={emblaMainRef}
          >
            <div className='product-thumbnails__container '>
              {images.map((image) => (
                <div
                  className='product-thumbnails__slide flex items-center justify-center'
                  key={`product-thumbnail-${image}`}
                >
                  <img
                    loading='lazy'
                    src={image}
                    alt=''
                    className='object-contain w-full aspect-video'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='product-thumbnails__thumbs'>
        <MaskShadow
          placement={placementShadow}
          className='md:scroll-shadow-size-[4rem]'
        >
          <div
            className='product-thumbnails__thumbs__viewport pb-5 '
            ref={emblaThumbsRef}
          >
            <ul className='product-thumbnails__thumbs__container gap-2'>
              {images.map((image, index) => (
                <li className='product-thumbnails__thumbs__slide' key={image}>
                  <button
                    onClick={() => onThumbClick(index)}
                    className={cn(
                      'rounded-md sm:rounded-xl p-3 w-full h-full flex items-center justify-center aspect-square bg-content1/70',
                      selectedIndex === index &&
                        'border-2 border-primary bg-content1 shadow-md lg:shadow-lg shadow-primary/40'
                    )}
                  >
                    <img
                      loading='lazy'
                      src={image}
                      alt=''
                      className='object-cover h-full'
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </MaskShadow>
      </div>
    </div>
  )
}
