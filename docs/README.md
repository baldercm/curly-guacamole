# TOC
   - [Example e2e](#example-e2e)
<a name=""></a>
 
<a name="example-e2e"></a>
# Example e2e
GET /.

```js
return request(app).get('/').expect(200).then(() => {
  return (0, _bluebird.all)([expect((0, _bluebird.reject)()).to.be.rejected]);
});
```

GET /error.

```js
return request(app).get('/error').expect(400);
```

