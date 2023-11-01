export interface ArtistDetailType {
    data: RootObjectDatum[];
   }
   
   export interface RootObjectDatum {
    attributes:    Attributes;
    id:            string;
    relationships: Relationships;
    type:          string;
   }
   
   export interface Attributes {
    artwork:    Artwork;
    genreNames: string[];
    name:       string;
    url:        string;
   }
   
   export interface Artwork {
    bgColor:    string;
    hasP3:      boolean;
    height:     number;
    textColor1: string;
    textColor2: string;
    textColor3: string;
    textColor4: string;
    url:        string;
    width:      number;
   }
   
   export interface Relationships {
    albums: Albums;
   }
   
   export interface Albums {
    data: AlbumsDatum[];
   }
   
   export interface AlbumsDatum {
    id:   string;
    type: string;
   }
   