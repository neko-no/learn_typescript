const names: string[] = ['Max', 'Yuto'];

const promise = new Promise<string>((res ,rej)=>{
     setTimeout(() => {
          res('終わりました!!')
     },2000)
})
