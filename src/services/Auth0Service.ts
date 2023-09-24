function generateToken(){
    return fetch(`${import.meta.env.VITE_REACT_APP_MANAGEMENT_URL}/oauth/token`,{
        method: 'POST',
        body:JSON.stringify({
            "client_id": `${import.meta.env.VITE_REACT_APP_MANAGEMENT_ID}`,
            "client_secret": `${import.meta.env.VITE_REACT_APP_MANAGEMENT_SECRET}`,
            "audience": `${import.meta.env.VITE_REACT_APP_MANAGEMENT_URL}/api/v2/`,
            "grant_type": "client_credentials"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then( data => {
        return data.json()})
    .then(data => data.access_token)
    .catch(err => {
        console.log("error al generar token", err)
    })
}

export async function updatePassword(userId: string, newPassword: string): Promise<boolean>{
    const token = await generateToken();
    const url = `${import.meta.env.VITE_REACT_APP_MANAGEMENT_ID}/api/v2/users/${userId}`

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
        "password": newPassword,
        "connection": "Username-Password-Authentication"
      });
      
    return fetch(url, {
        headers: myHeaders,
        body: JSON.stringify({
            password: newPassword,
            connection: "Username-Password-Authentication"
          }),
        method: 'PATCH',
        redirect: 'follow'
      })
    .then(response => response.status == 200)
    .catch(error => {
        console.log('error', error)
        return false
    });
}