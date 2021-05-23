import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../interfaces/note.interface';
import { CreateNoteDTO } from '../dtos/note.dto';

@Injectable()
export class NoteService {
    constructor(@InjectModel("Note") private readonly noteModel: Model<Note>) { }
    async createANote(createNoteDTO: CreateNoteDTO): Promise<Note> {
        const newNote = await this.noteModel.create(createNoteDTO);
        return newNote.save();
    }

    async getAllNotes(): Promise<Note[]> {
        const notes = await this.noteModel.find().exec();
        return notes;
    }

    async getANote(noteId): Promise<Note> {
        const note = await this.noteModel.findById(noteId).exec();
        return note;
    }

    async markAsFavorite(noteId): Promise<Note> {
        const note = await this.noteModel.findById(noteId).exec();
        var noteDTO: CreateNoteDTO = new CreateNoteDTO();
        noteDTO.favorite = true;
        const res = this.updateANote(noteId, noteDTO);
        return res;
    }

    async updateANote(_id, createNoteDTO: CreateNoteDTO): Promise<Note> {
        const note = await this.noteModel.findByIdAndUpdate(_id, createNoteDTO, { new: true });
        return note;
    }

    async getAllFavorites(): Promise<Note[]> {
        const notes = await this.noteModel.find().where('favorite').equals(true).exec();
        return notes;
    }

}