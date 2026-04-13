{
  email: {
    type: 'field',
    value: 'mateus@@email..com',
    msg: 'Formato de e-mail inválido.',
    path: 'email',
    location: 'body'
  },
  senha: {
    type: 'field',
    value: '123',
    msg: 'A senha deve conter no mínimo 8 caracteres.',
    path: 'senha',
    location: 'body'
  }
}
//middleware dados dos erros login


// apos verificar codigo de login 
   req.session.usuario = {
    id: resultado.usuario.id,
    email: resultado.usuario.email,
  };