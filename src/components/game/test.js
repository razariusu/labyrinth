{rows.forEach((row) => {
  console.log('rows.forEach success', row)
  row.map((obj) => {
    console.log('row.map success', obj)
    let result = getSides(obj.sides);
    console.log(result)
    let styleAdd = {backgroundImage: `url("/img/${result}")`}
    console.log(styleAdd)
    return <p>Hello<p>
  })
})}
