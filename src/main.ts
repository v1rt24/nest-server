import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => console.log(`Запущено: http://localhost:3000`));
}

bootstrap();
