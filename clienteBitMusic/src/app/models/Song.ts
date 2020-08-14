import { SongService } from '../services/song.service';

export interface Song{
    id: String;
    number: Number;
    name: String;
    duration: String;
    file: File;
    author: String;
}