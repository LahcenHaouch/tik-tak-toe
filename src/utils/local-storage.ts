import {useRef, useState, useEffect} from 'react'

export interface LocalStorageOptions<T> {
  readonly initialState: T
  readonly key: string
  readonly serialize?: (input: T) => string
  readonly deserialize?: (input: string) => T
}

export function useLocalStorage<T>({
  initialState,
  key,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}: LocalStorageOptions<T>): [T, (state: T) => void] {
  const prevKeyRef = useRef(key)

  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key)

    if (item) {
      return deserialize(item)
    } else {
      return typeof initialState === 'function' ? initialState() : initialState
    }
  })

  useEffect(() => {
    const prevKey = prevKeyRef.current

    if (key !== prevKey) {
      localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key

    localStorage.setItem(key, serialize(state))
  }, [state, key, serialize])

  return [state, setState]
}
