import { DragEventHandler, useCallback, useState } from 'react';

export default function DragAndDropImage() {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  return (
    <div>
      <input className="hidden" type="file" id="dad" multiple={false} />
      <label>
        <div>hi</div>
      </label>
    </div>
  );
}
