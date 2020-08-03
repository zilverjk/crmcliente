import React from 'react'
import Swal from 'sweetalert2'
import { gql, InMemoryCache, useMutation, useQuery } from '@apollo/client'

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      stock
    }
  }
`

const Producto = ({ producto }) => {
  const { nombre, precio, stock, id } = producto

  // Mutation para eliminar productos
  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update: cache => {
      const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS })

      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(item => item.id !== id),
        },
      })
    },
  })

  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este Producto?',
      text: 'Esta acción no puede deshacerse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'No, cancelar',
    }).then(async result => {
      if (result.value) {
        try {
          const { data } = await eliminarProducto({
            variables: {
              id,
            },
          })

          Swal.fire('Eliminado!', data.eliminarProducto, 'success')
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  return (
    <tr>
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{stock}</td>
      <td className="border px-4 py-2">{precio}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded font-bold"
          onClick={() => confirmarEliminarProducto()}
        >
          Eliminar
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h5 ml-2">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded font-bold"
          // onClick={() => editarCliente()}
        >
          Editar
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h5 ml-2">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default Producto
