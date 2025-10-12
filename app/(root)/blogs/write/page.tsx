"use client";
import * as React from "react";
import {
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Image from "next/image";
import styles from "./writePage.module.css";
import { useRouter } from "next/navigation";
import { Storage } from "megajs";

import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";
import { CreateBlogApi } from "@/apis";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const WritePage: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { makeApiCall } = useApi();

  const editor = useRef(null);
  const [megaStorage, setMegaStorage] = useState<any>(null);

  useEffect(() => {
    const storage = new Storage({
      email: process.env.NEXT_PUBLIC_MEGA_EMAIL || "workist.ai@gmail.com",
      password: process.env.NEXT_PUBLIC_MEGA_PASSWORD || "Gaurav@123",
      userAgent: "WorkistBlog/1.0",
    });

    storage.on("ready", () => {
      console.log("✅ MEGA storage ready");
      setMegaStorage(storage);
    });

    (storage as any).on("error", (err: any) => {
      console.error("❌ MEGA error:", err);
      showToast("Failed to connect to MEGA.", { type: "error" });
    });
  }, [showToast]);

  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState(""); // blog content
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("style");
  const [editorsPick, setEditorsPick] = useState(false);
  const [mostPopular, setMostPopular] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (!allowedTypes.includes(selectedFile.type)) {
          showToast("Only PNG, JPG, and JPEG files are allowed", {
            type: "error",
          });
          return;
        }
        setFile(selectedFile);
      }
    },
    [showToast]
  );

  const validateFields = (): boolean => {
    let valid = true;
    if (!title.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else setTitleError("");
    if (!value.trim()) {
      setDescError("Description is required");
      valid = false;
    } else setDescError("");
    return valid;
  };

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!validateFields()) return;
    if (!megaStorage) {
      showToast("MEGA storage not ready yet. Try again.", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      let fileUrl: string | null = null;
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadedFile = await megaStorage.upload(file.name, buffer, {
          size: buffer.length,
        }).complete;
        fileUrl = await uploadedFile.link();
        console.log("✅ File uploaded to MEGA:", fileUrl);
      }
      await makeApiCall(
        CreateBlogApi(
          slugify(title),
          title,
          value,
          catSlug || "style",
          fileUrl,
          editorsPick,
          mostPopular
        )
      );
      showToast("Post created successfully", { type: "success" });
      router.push("/blogs");
    } catch (error: any) {
      console.error("Upload or API error:", error);
      showToast(error.message || "Failed to create post", { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [
    title,
    value,
    catSlug,
    file,
    editorsPick,
    mostPopular,
    megaStorage,
    makeApiCall,
    showToast,
    router,
  ]);

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Tell your story, add code, images, videos...",
      height: 800,
      style: {
        fontSize: "18px",
      },

      font: "Poppins, sans-serif",
      controls: {
        font: {
          list: {
            "Poppins, sans-serif": "Poppins",
            "Arial,Helvetica,sans-serif": "Arial",
            "Georgia,serif": "Georgia",
            "Impact,Charcoal,sans-serif": "Impact",
            "Tahoma,Geneva,sans-serif": "Tahoma",
            "'Times New Roman',Times,serif": "Times New Roman",
            "Verdana,Geneva,sans-serif": "Verdana",
          },
        },
      },
      buttons:
        "bold,italic,underline,strike,|,align,|,ul,ol,|,paragraph,font,fontsize,|,link,image,|,source",
    }),
    []
  );

  const handleEditorChange = useCallback((newContent: string) => {
    setValue(newContent);
  }, []);

  // The rest of your component's JSX remains exactly the same
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Create New Post</h1>
        <button
          className={styles.publish}
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.loader} /> Publishing...
            </>
          ) : (
            "Publish"
          )}
        </button>
      </div>

      <input
        type="text"
        placeholder="Title"
        className={`${styles.input} ${titleError ? styles.inputError : ""}`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && <div className={styles.errorText}>{titleError}</div>}

      <div className={styles.metaControls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Category</label>
          <select
            className={styles.select}
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value="style">Style</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="culture">Culture</option>
            <option value="travel">Travel</option>
            <option value="coding">Coding</option>
            <option value="news">News</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Featured Image</label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <label htmlFor="image" className={styles.fileInputLabel}>
            {file ? file.name : "Choose an image..."}
          </label>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Flags</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={editorsPick}
                onChange={(e) => setEditorsPick(e.target.checked)}
              />
              Editor's Pick
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={mostPopular}
                onChange={(e) => setMostPopular(e.target.checked)}
              />
              Most Popular
            </label>
          </div>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <JoditEditor
          ref={editor}
          value={value}
          config={editorConfig}
          onChange={handleEditorChange}
        />
        {descError && <div className={styles.errorText}>{descError}</div>}
      </div>
    </div>
  );
};

export default WritePage;
