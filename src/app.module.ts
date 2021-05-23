import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './modules/note.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://madaimi:mongodb@cluster0.go48j.mongodb.net/notesDB?retryWrites=true&w=majority",
    /*process.env.DATABASE_URI,*/
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
  NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
