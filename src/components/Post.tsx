import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import styles from './Post.module.css';

import { Avatar } from './Avatar';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps{
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({author, publishedAt, content}: PostProps){
    // 1- vetor comentarios 2- funcao responsavel por alterar comentarios
    //useState( "INICIALIZANDO VARIAVEL" )
    const [comments, setComment] = useState(['Comentario teste']);

    const [textComment, setNewTextComment] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true

    })

    //Função para texto digitado no comentario
    //Adionei o GENERIC "<HTMLTextAreaElement>" para dizer de onde esta vindo o evento
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        // Necessario setar customValidity como vazio para nao dar erro
        event.target.setCustomValidity('');

        setNewTextComment(event.target.value);
    }

    //Função para adicionar novo comentario
    function handleNewComment(event: FormEvent){
        //event é oque chama a função
        event.preventDefault();
        
        //pego todos comentarios e adiciono mais um
        setComment([...comments, textComment]);

        setNewTextComment('');
    }

    //Função para configurar mensagem de erro da textarea
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    //IMUTABILIDADE
    function deleteComment(commentToDelete: string){
        //Filtrando e criando um novo array com todos comentarios que sao diferentes do comentario que quero apagar
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        });

        //Setando o novo array sem o comentario 
        setComment(commentsWithoutDeleteOne);
    }

    const isNewCommentEmpty = textComment.length == 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(line =>{
                    if(line.type == 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    } else if(line.type == 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    placeholder='Deixe seu comentario'
                    name='comment'
                    value={textComment}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    {/* newCommentText e alterado a cada digitação do usuario
                        então, se o tamnho dele for = a 0, desabilita o botao
                    */}
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment =>{
                    return <Comment 
                        key={comment}
                        content={comment}
                        onDeleteComment={deleteComment}
                        />
                })}
            </div>
        </article>
    )
}