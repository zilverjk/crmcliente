import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Layout from '../components/Layout'
import { gql, useMutation } from '@apollo/client'

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      stock
      precio
    }
  }
`

const NuevoProducto = () => {
  // Mutation de apollo
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO)

  // Formulario para nuevos productos
  const formik = useFormik({
    initialValues: {
      nombre: '',
      stock: '',
      precio: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del producto es obligatorio'),
      stock: Yup.number()
        .required('Se debe agregar una cantidad para este producto')
        .positive('Sólo números positivos'),
      precio: Yup.number().required('El precio no puede estar vacío').positive('Sólo números positivos'),
    }),
    onSubmit: async values => {
      const { nombre, stock, precio } = values

      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              stock,
              precio,
            },
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre del Producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="number"
                placeholder="Stock del producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />
            </div>

            {formik.touched.stock && formik.errors.stock ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.stock}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="Precio del Producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              />
            </div>

            {formik.touched.precio && formik.errors.precio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Registrar Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default NuevoProducto
