import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true // 将请求传入的数据，转化为OTO的实例
  }))


  // swagger配置
  const config = new DocumentBuilder().setVersion('1.0')
  .setTitle('nestjs api 文档标题')
  .setDescription('文档描述')
  .setTermsOfService('服务条款')
  .setLicense("MIT License",'') // 许可证
  .addServer('http://localhost:3000/')
  .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document)



  await app.listen(3000);
}
bootstrap();
