import { onBeforeUnmount, onMounted, reactive, type Ref, ref } from 'vue'

type ApiResponse = {
  results: {
    name: {
      title: string
      first: string
      last: string
    }
    email: string
    login: {
      uuid: string
    }
    picture: {
      large: string
    }
  }[]
}

type User = {
  id: string
  name: string
  email: string
  imageUrl: string
}

const ITEMS_PER_REQUEST = 100
const ITEMS_PER_PAGE = 20

const resultToUser = ({
  name,
  email,
  login,
  picture
}: ApiResponse['results'][0]): User => ({
  id: login.uuid,
  name: `${name.title} ${name.first} ${name.last}`,
  email,
  imageUrl: picture.large
})

export function useUsersLoader(): {
  isLoading: Ref<boolean>
  users: User[]
} {
  const isLoading = ref<boolean>(false)
  const users = reactive<User[]>([])
  const cache: User[] = []

  const loadUsers = async () => {
    if (isLoading.value) {
      return
    }

    isLoading.value = true

    const hasCache = cache.length > 0

    if (!hasCache) {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?results=${ITEMS_PER_REQUEST}&inc=name,email,login,picture`
        )

        const { results } = (await response.json()) as ApiResponse

        const hasResults = results.length > 0

        if (hasResults) {
          const newUsers = results.map(resultToUser)

          const toAppend = newUsers.slice(0, ITEMS_PER_PAGE)

          users.push(...toAppend)

          console.log('Loaded from API', toAppend)

          const toCache = newUsers.slice(ITEMS_PER_PAGE, newUsers.length)

          cache.push(...toCache)

          console.log('Cached from API', toCache)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      const toAppend = cache.splice(0, ITEMS_PER_PAGE)

      users.push(...toAppend)

      console.log('Loaded from cache', toAppend)
    }

    isLoading.value = false
  }

  const handleScroll = async () => {
    const isScrolledDown =
      Math.abs(
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight
      ) < 10

    if (isScrolledDown) {
      await loadUsers()
    }
  }

  onMounted(async () => {
    window.addEventListener('scroll', handleScroll)
    await loadUsers()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isLoading,
    users
  }
}
