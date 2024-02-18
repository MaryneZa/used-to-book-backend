## สร้าง database schema
> const Cat = mongoose.model('Cat', { name: String });

## สร้าง instance จาก model
> const kitty = new Cat({ name: 'JavaScript' });

## save ลง database (return เป็น Promise)
> kitty.save().then(() => console.log('meow'));

## enviroment

> cp .env-example .env