PGDMP  #    #                |            emhareHotmail    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16553    emhareHotmail    DATABASE     �   CREATE DATABASE "emhareHotmail" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "emhareHotmail";
                postgres    false            �            1259    16598    suggestions    TABLE       CREATE TABLE public.suggestions (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    category character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer
);
    DROP TABLE public.suggestions;
       public         heap    postgres    false            �            1259    16597    suggestion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.suggestion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.suggestion_id_seq;
       public          postgres    false    218            �           0    0    suggestion_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.suggestion_id_seq OWNED BY public.suggestions.id;
          public          postgres    false    217            �            1259    16558    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16557    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            V           2604    16601    suggestions id    DEFAULT     o   ALTER TABLE ONLY public.suggestions ALTER COLUMN id SET DEFAULT nextval('public.suggestion_id_seq'::regclass);
 =   ALTER TABLE public.suggestions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            U           2604    16561    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16598    suggestions 
   TABLE DATA           X   COPY public.suggestions (id, title, message, category, created_at, user_id) FROM stdin;
    public          postgres    false    218   Q       �          0    16558    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public          postgres    false    216   �       �           0    0    suggestion_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.suggestion_id_seq', 6, true);
          public          postgres    false    217            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 10, true);
          public          postgres    false    215            ]           2606    16606    suggestions suggestion_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.suggestions
    ADD CONSTRAINT suggestion_pkey PRIMARY KEY (id);
 E   ALTER TABLE ONLY public.suggestions DROP CONSTRAINT suggestion_pkey;
       public            postgres    false    218            Y           2606    16565    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            [           2606    16567    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            ^           2606    16608 $   suggestions suggestions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.suggestions
    ADD CONSTRAINT suggestions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.suggestions DROP CONSTRAINT suggestions_user_id_fkey;
       public          postgres    false    218    4697    216            �   <  x�u�?o�0�g�S�֩Q�/���b(Y��,'����)�Ԫ�n�����;s��'�͚톞�;_�8xE�zj�d�q�I�sCn
q!��X�rYi��9{�'�������F��B$����4�~��1i����5��~�h��D!�#���Z�Z�9/�y2�lK3��]Ga2�co�8�;�'9{!G�������#OJ���5�en/l�^��_�kM�B�E�E%ҚfaBK�C�V���b�I�.�/�7gs�/ao��3#]ՅΕ,K~U�������#�����51$p]�*%\�J,o�}�e�'_w�$      �   �   x�5��vC@  е����H)K��Q"���i=k��������{�Nbq�S`I�{`$��#5z\*>#����Nw� �|孍��ĺ�R�|"g߯�H�,��[!�+l��w�rO�Cu�K��>#^��bR���G�O@���2���I~��qz�jEl74��Lh�a��!N��dA7�)��U���s!�(9��i6	��Xj���,=�}te�3=�}Ϯ揪�b�V��S2I2�� �qV�     