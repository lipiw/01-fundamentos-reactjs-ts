import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css'

import {Avatar} from './Avatar';
import { useState } from 'react';

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps){

    const [likeComment, setLikeComment] = useState(0);

    //Função para deletar comentario, passada por propriedades
    function handleDeleteComment(){
        onDeleteComment(content)
    }

    //Função para curtidas nos comentarios
    function handleLikeComment(){
        //CLOSURES
        setLikeComment((state) => {
            return state + 1
        });
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/lipiw.png"/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorTime}>
                            <strong>Devon Lane</strong>
                            <time title='06 de Julho ás 21:56h' dateTime='2022-07-06 21:56:30'>Cerca de 1h atrás</time>
                        </div>

                        <button 
                            title='Deletar comentário'
                            onClick={handleDeleteComment}
                            >
                            <Trash size={20}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button
                        onClick={handleLikeComment}
                    >
                        <ThumbsUp/>
                        Aplaudir <span>{likeComment}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}