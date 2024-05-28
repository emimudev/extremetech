import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea
} from '@nextui-org/react'
import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import useSWR from 'swr'
import { CategoryService } from '@/services/category-service'
import { BrandsService } from '@/services/brands-service'
import { cn } from '@/lib/utils'
import CarouselFluid from '@/components/carousel-fluid'
import CarouselFluidItem from '@/components/carousel-fluid/item'
import { toast } from 'sonner'
import { ProductRequest } from '@/types/product-request'
import { ProductService } from '@/services/product-service'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Enter a valid email' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
  offer: z.string().min(1, { message: 'Offer is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  stock: z.string().min(1, { message: 'Stock is required' }),
  images: z.array(z.string()).min(1, { message: 'Images are required' }),
  attributes: z.array(
    z.object({
      attributeId: z.number(),
      attributeName: z
        .string()
        .min(1, { message: 'This attribute is required' }),
      value: z.string().min(1, { message: 'Value is required' })
    })
  )
})

export function CreateProductPage() {
  const navigate = useNavigate()
  const { data: categories } = useSWR(
    'api/v1/categories',
    () => {
      return CategoryService.getAll().then((res) => res)
    },
    { keepPreviousData: true }
  )
  const { data: brands } = useSWR(
    'api/v1/brands',
    () => {
      return BrandsService.getAll().then((res) => res)
    },
    { keepPreviousData: true }
  )
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [isUploadingProduct, setIsUploadingProduct] = useState(false)
  // const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      offer: '0',
      brand: '',
      category: '',
      stock: '1',
      images: [],
      attributes: []
    }
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'attributes'
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoadingImages(true)
        acceptedFiles.forEach((file) => {
          const reader = new FileReader()

          reader.onloadend = () => {
            const base64Image = reader.result as string
            form.setValue('images', [...form.getValues().images, base64Image], {
              shouldTouch: true,
              shouldValidate: true
            })
          }
          reader.readAsDataURL(file)
        })
      }
    },
    [form]
  )

  const handleAddImages = async (images64: string[]) => {
    setIsUploadingProduct(true)
    const idToast = toast.loading('Uploading images...')
    const promises = images64.map((img) => {
      return fetch('https://api.cloudinary.com/v1_1/dvpbdhkn0/image/upload', {
        method: 'POST',
        body: JSON.stringify({
          file: img,
          upload_preset: 'cxter47d'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          return data
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    })

    const responses = await Promise.all(promises)
    toast.dismiss(idToast)
    console.log({ responses })
    return responses
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize: 61865984
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })

    handleAddImages(values.images).then((res: any) => {
      setIsUploadingProduct(true)
      toast.success('Images uploaded successfully')
      const toastProductId = toast.loading('Creating product...')
      const images = res.map((img: any) => img.secure_url)
      const newProduct: ProductRequest = {
        name: values.name,
        description: values.description,
        price: Number(values.price),
        offer: {
          discount: Number(values.offer)
        },
        brand: {
          id: Number(values.brand)
        },
        category: {
          id: categories?.find((cat) => cat.code === values.category)?.id ?? 0,
          code: values.category
        },
        isOnSale: true,
        stock: Number(values.stock),
        images,
        isFeatured: false,
        attributes: values.attributes.map((attr) => ({
          attribute: { id: attr.attributeId },
          value: attr.value
        }))
      }
      console.log({ productToAdd: newProduct })
      ProductService.createProduct(newProduct)
        .then((res) => {
          console.log({ res })
          toast.success('Product created successfully')
          navigate('/manage-products')
        })
        .catch((err) => {
          console.error(err)
          toast.error('Error creating product')
        })
        .finally(() => {
          toast.dismiss(toastProductId)
          setIsUploadingProduct(false)
        })
    })
  }

  const fillAttributes = (categoryCode: string) => {
    console.log('selected', { categoryCode })
    const category = categories?.find((cat) => cat.code === categoryCode)
    if (category) {
      append(
        category.attributes.map((attr) => ({
          attributeId: attr.id,
          attributeName: attr.name,
          id: attr.id,
          value: ''
        }))
      )
    }
  }

  const hasErrorImages = form.formState.errors.images

  return (
    <div className='pb-10'>
      <div className='z-0 main-padding overflow-hidden relative min-h-20 flex items-center justify-between border-b-1 border-rose-950/80 flex-[0_0_auto] bg-gradient-to-r from-rose-800/10 via-rose-950/10 to-indigo-950/10'>
        <h1 className='text-foreground-strong border-divider text-lg md:text-xl'>
          Create new Product
        </h1>
      </div>
      <div className='main-padding'>
        <h2 className='my-6 text-xl'>Product Information</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='flex flex-wrap gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex-[1_1_220px]'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        variant='faded'
                        autoComplete='name'
                        placeholder='Product name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='brand'
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem className='flex-[1_1_220px]'>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Select
                        variant='faded'
                        aria-label='brands'
                        // autoComplete='name'
                        placeholder='Select a brand'
                        onChange={(event: any) => {
                          onChange(event)
                        }}
                        {...fieldProps}
                      >
                        {brands
                          ? brands.map((brand) => (
                              <SelectItem key={brand.id}>
                                {brand.name}
                              </SelectItem>
                              // eslint-disable-next-line indent
                            ))
                          : []}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      variant='faded'
                      // autoComplete='name'
                      placeholder='Product description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-wrap gap-4'>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem className='flex-[1_1_220px]'>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        // type='number'
                        variant='faded'
                        // autoComplete='name'
                        placeholder='Price'
                        // onChange={(event: any) => {
                        //   onChange(Number(event.target.value))
                        // }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='offer'
                render={({ field }) => (
                  <FormItem className='flex-[1_1_220px]'>
                    <FormLabel>Offer</FormLabel>
                    <FormControl>
                      <Input
                        // type='number'
                        variant='faded'
                        // autoComplete='name'
                        placeholder='Offer'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='stock'
                render={({ field }) => (
                  <FormItem className='flex-[1_1_220px]'>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        // type='number'
                        variant='faded'
                        // autoComplete='name'
                        placeholder='Product description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem className='flex-[1_1_220px]'>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        variant='faded'
                        aria-label='categories'
                        // autoComplete='name'
                        placeholder='Category'
                        onChange={(event: any) => {
                          form.setValue('attributes', [])
                          // form.reset({ ...form.getValues(), attributes: [] })
                          fillAttributes(event.target.value)
                          form.setValue('category', event.target.value)
                          // onChange(event)
                        }}
                        {...fieldProps}
                      >
                        {categories
                          ? categories.map((category) => (
                              <SelectItem key={category.code}>
                                {category.name}
                              </SelectItem>
                              // eslint-disable-next-line indent
                            ))
                          : []}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-wrap gap-4'>
              {fields.map((attr, index) => (
                <FormItem key={attr.id} className='flex-[1_1_220px]'>
                  <FormLabel>{attr.attributeName}</FormLabel>
                  <FormControl>
                    <Input
                      key={attr.id}
                      variant='faded'
                      aria-label='categories'
                      // autoComplete='name'
                      placeholder={'Enter ' + attr.attributeName}
                      {...form.register(`attributes.${index}.value`, {
                        required: {
                          value: true,
                          message: 'This field is required'
                        }
                      })}
                    >
                      {categories
                        ? categories.map((category) => (
                            <SelectItem key={category.code}>
                              {category.name}
                            </SelectItem>
                            // eslint-disable-next-line indent
                          ))
                        : []}
                    </Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            </div>
            <Divider className='my-6' />
            <h2 className='text-xl'>Product Images</h2>

            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div
                className={cn(
                  'rounded-xl h-28 w-full bg-content1 flex justify-center items-center text-center',
                  isDragActive && 'bg-emerald-500/40',
                  hasErrorImages && 'bg-rose-500/40'
                )}
              >
                {!hasErrorImages && (
                  <p>Drop images here, or click to select files</p>
                )}
                {hasErrorImages && 'Images are required'}
              </div>
            </div>

            {form.getValues().images && form.getValues().images.length > 0 && (
              <CarouselFluid>
                {/* <CarouselContent> */}
                {form.getValues().images.map((img, index) => (
                  <CarouselFluidItem key={index} className=''>
                    <div className='aspect-video overflow-hidden px-1'>
                      <img
                        src={img}
                        alt=''
                        className='w-full aspect-video h-auto object-cover rounded-xl'
                      />
                    </div>
                  </CarouselFluidItem>
                ))}
                {/* </CarouselContent> */}
              </CarouselFluid>
            )}

            <Divider className='my-6' />
            <Button type='submit' color='primary'>
              Create Product
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
