const API_KEY = ''

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
};

const getData = async(url) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        return data

    } catch (error) {
        console.log("Fetch error: ", error)
    }
}

export default getData