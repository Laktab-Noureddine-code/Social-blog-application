import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function ModifierProfil({ name, coverPhoto, profilePicture }) {
    const [nom, setNom] = useState(name);
    const [photoProfil, setPhotoProfil] = useState(profilePicture);
    const [photoCouverture, setPhotoCouverture] = useState(coverPhoto);

    // States to track selected images and preview URLs
    const [photoProfilPreview, setPhotoProfilPreview] = useState(null);
    const [photoCouverturePreview, setPhotoCouverturePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            nom,
            photoProfil: photoProfil ? photoProfil.name : '',
            photoCouverture: photoCouverture ? photoCouverture.name : ''
        };
        alert(JSON.stringify(profileData)); // Juste pour tester
    };

    const handlePhotoProfilChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoProfil(file);
            setPhotoProfilPreview(URL.createObjectURL(file));
        }
    };

    const handlePhotoCouvertureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoCouverture(file);
            setPhotoCouverturePreview(URL.createObjectURL(file));
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="absolute right-4 top-4 bg-black/50 text-white cursor-pointer font-bold text-sm">
                    Modifier le profil
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="">
                    <DialogTitle>Modifier le profil</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className='space-y-2'>
                        <Label>Nom</Label>
                        <Input
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Entrez votre nom"
                            className="focus:border-blue-500 focus:ring-blue-500 hover:border-blue-300"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label>Photo de profil</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoProfilChange}
                            className="focus:border-blue-500 focus:ring-blue-500 hover:border-blue-300"
                        />
                        {photoProfilPreview && (
                            <div className="relative mt-2 inline-block">
                                <img
                                    src={photoProfilPreview}
                                    alt="Aperçu photo de profil"
                                    className="h-24 w-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPhotoProfilPreview(null);
                                        setPhotoProfil(null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label>Photo de couverture</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoCouvertureChange}
                            className="focus:border-blue-500 focus:ring-blue-500 hover:border-blue-300"
                        />
                        {photoCouverturePreview && (
                            <div className="relative mt-2 inline-block">
                                <img
                                    src={photoCouverturePreview}
                                    alt="Aperçu photo de couverture"
                                    className="h-24 w-48 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPhotoCouverturePreview(null);
                                        setPhotoCouverture(null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}